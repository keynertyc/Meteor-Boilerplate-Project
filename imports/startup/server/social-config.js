ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: 'xxxxxxxx', // Set
            loginStyle: 'popup',
            secret: 'xxxxxxxx' // Set
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
        $set: {
            consumerKey: 'xxxxxxxx', // Set
            loginStyle: 'popup',
            secret: 'xxxxxxxx' // Set
        }
    }
);