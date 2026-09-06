import { createActor } from "@/backend";
import type { ChatMessage, DiseaseEntry, ScanInput, ScanRecord } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Convert a Motoko nanosecond bigint timestamp to a JS Date. */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function useScans() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["scans"],
    queryFn: async (): Promise<ScanRecord[]> => {
      if (!actor) return [];
      return actor.listScans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useScan(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["scan", id],
    queryFn: async (): Promise<ScanRecord | null> => {
      if (!actor || id === null) return null;
      return actor.getScan(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateScan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ScanInput): Promise<ScanRecord> => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createScan(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
  });
}

export function useDiseases() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["diseases"],
    queryFn: async (): Promise<DiseaseEntry[]> => {
      if (!actor) return [];
      return actor.getDiseases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDiseasesByCrop(crop: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["diseases", "crop", crop],
    queryFn: async (): Promise<DiseaseEntry[]> => {
      if (!actor || !crop) return [];
      return actor.getDiseasesByCrop(crop);
    },
    enabled: !!actor && !isFetching && !!crop,
  });
}

export function useSearchDiseases(searchTerm: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["diseases", "search", searchTerm],
    queryFn: async (): Promise<DiseaseEntry[]> => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchDiseases(searchTerm.trim());
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
  });
}

export function useChatHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["chatHistory"],
    queryFn: async (): Promise<ChatMessage[]> => {
      if (!actor) return [];
      return actor.getChatHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendChatMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: string): Promise<ChatMessage> => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.sendChatMessage(message);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
}
