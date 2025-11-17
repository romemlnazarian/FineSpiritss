import { POST } from "../../api/Network";
import { Route } from "../../api/Route";

export const refreshTokenModel = (
    refresh: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
) => {
    POST(
        Route.root,
        Route.refresh_token,
        (data: { detail?: boolean; message?: string; data?: any; access?: string; refresh?: string; access_token?: string; refresh_token?: string }) => {
            const anyData: any = data;
            // Success shapes can vary: return tokens directly or nested under data
            const tokens = anyData?.data ?? anyData;
            if (tokens && (tokens.access || tokens.access_token)) {
                callback(tokens);
                return;
            }
            if (anyData && typeof anyData === 'object' && 'detail' in anyData) {
                if (anyData.detail) {
                    callback(anyData);
                } else {
                    errorcallback(String(anyData.message ?? 'Unexpected response'));
                }
            } else {
                errorcallback('Unexpected response');
            }
        },
        '',
        { refresh },
    );
}