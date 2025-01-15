import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store/store";
import { fetchAgentByIdAsync } from "@/store/agentSlice";

export default function AgentDetail() {
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const agentData = useSelector((state: RootState) => state.agents.selectedAgent);

    useEffect(() => {
        if (!agentData?.name) {
            dispatch(fetchAgentByIdAsync(id || ""));
        }
    }, [id, dispatch]);

    return (
        <div className="w-full h-screen">
            <div className="container mx-auto py-20 h-full overflow-auto px-4">
                <div className="border-b pb-1 w-full flex mb-2 justify-between">
                    <Link to="/">
                        <Button variant="ghost">
                            <ArrowLeftIcon />
                            Return to List
                        </Button>
                    </Link>
                </div>
                {
                    agentData && 
                    <div className="flex flex-col gap-2">
                        <h2 className="text-sm">Agent Name: {agentData.name}</h2>
                        <h2 className="text-sm">Agent Email: {agentData.email}</h2>
                        <h2 className="text-sm">Agent Status: {agentData.status}</h2>
                    </div>
                }
            </div>
        </div>
    )
}
