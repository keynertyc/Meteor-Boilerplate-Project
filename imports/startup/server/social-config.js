ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: 'xxxxxx',// Set
            loginStyle: 'popup',
            secret: 'xxxxxx'// Set
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
        $set: {
            consumerKey: 'xxxxxx',// Set
            loginStyle: 'popup',
            secret: 'xxxxxx'// Set
        }
    }
);