interface EnvironmentConfiguration {
    /**
     * Whether or not this is a production environment
     */
    production?: boolean;

    /**
     * The base path to use for the API
     */
    apiBasePath: string;
}

export default EnvironmentConfiguration;
