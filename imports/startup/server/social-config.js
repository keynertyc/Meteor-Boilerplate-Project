ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: '335644913221961',
            loginStyle: 'popup',
            secret: '426a02b801f0da89b5809d60cfe368da'
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
        $set: {
            consumerKey: 'oruzCk5HmzxFB5iTWblcHfpYN',
            loginStyle: 'popup',
            secret: '9sShwJV0Ch7Pn5hlw7LcOrtq7wznJoA4g56Ua3pIQuZLGOg3TF'
        }
    }
);