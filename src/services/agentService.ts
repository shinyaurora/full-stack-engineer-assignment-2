import axios from "axios";
import type { AgentType } from "@/types/Agent";

const API_URL = 'http://localhost:3001/agents';

export const getAgents = async (): Promise<AgentType[]> => {
    const response = await axios.get<AgentType[]>(API_URL);
    return response.data;
}

export const addAgent = async (agent: Omit<AgentType, 'id'>): Promise<AgentType> => {
    const response = await axios.post<AgentType>(API_URL, agent);
    return response.data;
}

export const updateAgent = async (agent: AgentType): Promise<AgentType> => {
    const response = await axios.put<AgentType>(`${API_URL}/${agent.id}`, agent);
    return response.data;
};

export const deleteAgent = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
}

export const getAgentById = async (id: string): Promise<AgentType> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}