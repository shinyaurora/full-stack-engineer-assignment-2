import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAgents,
    addAgent,
    updateAgent,
    deleteAgent,
    getAgentById
} from "@/services/agentService";
import { AgentType } from "@/types/Agent";

//Fetch Agent List
export const fetchAgentsAsync = createAsyncThunk("agents/fetchAgents", async () => {
    return await getAgents();
});

// Add Agent
export const addAgentAsync = createAsyncThunk("agetns/addAgent", async (agent: Omit<AgentType, "id">) => {
    return await addAgent(agent);
})

// Update Agent
export const updateAgentAsync = createAsyncThunk("agents/updateAgent", async (agent: AgentType) => {
    return await updateAgent(agent);
})

// Delete Agent
export const deleteAgentAsync = createAsyncThunk("agents/deleteAgent", async (id: string) => {
    await deleteAgent(id);
    return id; // Return the ID to update the Redux store
})

export const fetchAgentByIdAsync = createAsyncThunk(
    'agents/fetchAgnetById',
    async (id: string) => {
        return await getAgentById(id);
    }
)

const agetnsSlice = createSlice({
    name: "agents",
    initialState: {
        list: [] as AgentType[],
        loading: false,
        selectedAgent: {} as AgentType | null,
        loadingAgent: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgentsAsync.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAgentsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchAgentsAsync.rejected, (state, action) => {
                state.error = action.error.message || "Failed to fetch agent list";
            })
            //Add agent to redux store
            .addCase(addAgentAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            //Update agent in redux store
            .addCase(updateAgentAsync.fulfilled, (state, action) => {
                const index = state.list.findIndex((agent) => agent.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            //Delete agent from redux store
            .addCase(deleteAgentAsync.fulfilled, (state, action) => {
                state.list = state.list.filter((agent) => agent.id !== action.payload);
            });
        
        // Fetch a single agent by ID
        builder
            .addCase(fetchAgentByIdAsync.pending, (state) => {
                state.loadingAgent = true;
                state.error = null;
                state.selectedAgent = null;
            })
            .addCase(fetchAgentByIdAsync.fulfilled, (state, action) => {
                state.selectedAgent = action.payload;
                state.loadingAgent = false;
            })
            .addCase(fetchAgentByIdAsync.rejected, (state, action) => {
                state.error = action.error.message || "Failed to fetch agent";
                state.loadingAgent = false;
            });
    }  
})

export default agetnsSlice.reducer