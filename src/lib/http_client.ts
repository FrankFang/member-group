import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

interface Config extends AxiosRequestConfig {
}

interface Client extends AxiosInstance {
}

interface ConsParams extends CreateAxiosDefaults {
}

export class HttpClient {
    client: Client

    constructor(config: ConsParams = {}) {
        this.client = axios.create(config)
    }

    async get<T = unknown>(url: string, query?: Record<string, unknown>, config?: Config) {
        return this.request<T>({ ...config, url, method: 'get', params: query })
    }

    async delete<T = unknown>(url: string, query?: Record<string, unknown>, config?: Config) {
        return this.request<T>({ ...config, url, method: 'delete', params: query })
    }

    async post<T = unknown>(url: string, data?: Record<string, unknown>, config?: Config) {
        return this.request<T>({ ...config, url, method: 'post', data })
    }

    async patch<T = unknown>(url: string, data?: Record<string, unknown>, config?: Config) {
        return this.request<T>({ ...config, url, method: 'patch', data })
    }

    private async request<T = unknown>(config: Config) {
        const response = await this.client.request<Api.Response<T>>(config)
        return response.data.data
    }
}

export const httpClient = new HttpClient({
    baseURL: process.env.API_BASE_URL,
    timeout: 10_000,
    headers: { 'X-Client': 'nodejs' },
})
