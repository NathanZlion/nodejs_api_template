import { IBaseReponse } from "./IBaseReponse"


interface HealthCheckPayload {
    uptime: number,
    database: {
        status: boolean,
        message: string
    },
    cacheService: {
        status: boolean,
        message: string
    },
    emailService: {
        status: boolean,
        message: string
    },
}


export type IHealthCheckResponse = IBaseReponse<HealthCheckPayload>
