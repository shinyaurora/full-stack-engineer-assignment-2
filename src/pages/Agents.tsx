import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import type { AgentType } from "@/types/Agent";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, MoreVerticalIcon, TrashIcon, EditIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import AgentForm from "@/components/AgentForm";

import { deleteAgentAsync, fetchAgentsAsync } from "@/store/agentSlice";

export default function Agents() {
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [formInitData, setFormInitData] = useState<AgentType>({ name: "", email: "", status: "active", id: "" });
    const [searchStr, setSearchStr] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { agents, isLoading, error } = useSelector((state: RootState) => ({
        agents: state.agents.list,
        isLoading: state.agents.loading,
        error: state.agents.error
    }));

    const handleAddNew = () => {
        setFormMode("add");
        setFormVisible(true);
    }

    const handleEdit = (ev: React.MouseEvent, data: AgentType) => {
        ev.stopPropagation();

        setFormInitData(data);
        setFormMode('edit');
        setFormVisible(true);
    }

    const handleDelete = (ev: React.MouseEvent, id: string) => {
        ev.stopPropagation();

        dispatch(deleteAgentAsync(id));
    }

    const handleRowClick = (id: string) => {
        navigate(`/agents/${id}`);
    } 

    useEffect(() => {
        dispatch(fetchAgentsAsync());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const filteredAgentList = agents.filter((agent) => 
        agent.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()) ||
        agent.email.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
    )

    return (
        <div className="w-full h-screen">
            <div className="container mx-auto py-20 h-full overflow-auto px-4">
                <div className="border-b pb-1 w-full flex mb-2 justify-between">
                    <Button size="sm" variant="ghost" onClick={handleAddNew}>
                        <PlusIcon />
                        Add New
                    </Button>
                    <div className="">
                        <Input placeholder="search" onChange={(e) => setSearchStr(e.target.value)} />
                    </div>
                </div>
                <div>
                    <Table>
                        <TableCaption className="font-bold">Agent List</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="borber-r w-10">No</TableHead>
                                <TableHead>A.Name</TableHead>
                                <TableHead>A.Email</TableHead>
                                <TableHead className="w-20">A.Status</TableHead>
                                <TableHead className="w-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredAgentList.map((item, idx) => {
                                    return (
                                        <TableRow key={item.id} onClick={() => handleRowClick(item.id)}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVerticalIcon />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem className="flex items-center">
                                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => handleEdit(e, item)}>
                                                                    <EditIcon />
                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center">
                                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => handleDelete(e, item.id)}>
                                                                    <TrashIcon />
                                                                    <span>
                                                                        Delete
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={formVisible} onOpenChange={setFormVisible}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {
                                formMode === "add" ?
                                    "Add Agent"
                                    :
                                    "Edit Agent"
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <AgentForm mode={formMode} initValue={formInitData} />
                </DialogContent>
            </Dialog>
        </div>
    )
}