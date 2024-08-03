import Client from './Client'

/**
 * Create a new sender Client
 */
export const createClient = (
    url: string,
    key: string
) => new Client(url, key)