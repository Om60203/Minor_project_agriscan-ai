import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
import type { ExternalBlob } from "@caffeineai/object-storage";
export type { ExternalBlob } from "@caffeineai/object-storage";
export interface ScanInput {
    video?: ExternalBlob;
    image: ExternalBlob;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface ScanRecord {
    id: bigint;
    treatment: Array<string>;
    description: string;
    imageUrl: ExternalBlob;
    organicSuggestions: Array<string>;
    diseaseName: string;
    timestamp: bigint;
    symptoms: Array<string>;
    severity: string;
    confidence: number;
    prevention: Array<string>;
    videoUrl?: ExternalBlob;
    expertAdvice: string;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface DiseaseEntry {
    crop: string;
    name: string;
    treatment: Array<string>;
    imageUrl: ExternalBlob;
    symptoms: Array<string>;
    causes: Array<string>;
    prevention: Array<string>;
}
export interface ChatMessage {
    content: string;
    role: ChatRole;
    timestamp: bigint;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum ChatRole {
    user = "user",
    assistant = "assistant"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createScan(input: ScanInput): Promise<ScanRecord>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getDiseases(): Promise<Array<DiseaseEntry>>;
    getDiseasesByCrop(crop: string): Promise<Array<DiseaseEntry>>;
    getScan(id: bigint): Promise<ScanRecord | null>;
    isCallerAdmin(): Promise<boolean>;
    listScans(): Promise<Array<ScanRecord>>;
    schema(): Promise<string>;
    searchDiseases(searchTerm: string): Promise<Array<DiseaseEntry>>;
    sendChatMessage(message: string): Promise<ChatMessage>;
}
