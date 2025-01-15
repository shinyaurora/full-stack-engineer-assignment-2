import React from "react";
import type { AgentType } from "@/types/Agent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { AppDispatch } from "@/store/store";

import { addAgentAsync, updateAgentAsync } from "@/store/agentSlice";
import { useDispatch } from "react-redux";

interface AgentFormProps {
    mode: "add" | "edit",
    initValue: AgentType
}

const formSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email().nonempty("Email is required"),
    status: z.enum(['active', 'inactive'])
})

const AgentForm: React.FC<AgentFormProps> = ({ mode, initValue }) => {
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initValue
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (mode === "edit") {
            dispatch(updateAgentAsync({ ...initValue, ...values }));
        } else {
            dispatch(addAgentAsync(values));
        }

        form.reset({ name: "", email: "", status: "active" });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel>Agent Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel>Agent Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel>Agent Status</FormLabel>
                            <FormControl>
                                <Switch
                                    className="block"
                                    checked={field.value === "active"}
                                    onCheckedChange={(checked) =>
                                        field.onChange(checked ? 'active' : 'inactive')
                                    }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-4">
                    <SaveIcon />
                    {mode === "add" ? 'Add Agent' : 'Update Agent'}
                </Button>
            </form>
        </Form>
    )
}

export default AgentForm;