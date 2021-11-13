export const menu = 
[
    {
        id: 'srv',
        text: 'Servis',
        expanded: false,
        items: 
        [
            {
                id: 'P0001',
                text: 'Terminal',
                path: '../pages/terminal.js'
            }
        ]
    },
    {
        id: 'usr',
        text: 'Kullanıcı',
        expanded: false,
        items: 
        [
            {
                id: 'P0002',
                text: 'Kullanıcılar',
                path: '../pages/users.js'
            },
            {
                id: 'P0003',
                text: 'Roller',
                path: '../pages/test.js'
            }
        ]
    },
    {
        id: 'prm',
        text: 'Parametre',
        expanded: false,
        items: []
    },
    {
        id: 'acs',
        text: 'Yetkilendirme',
        expanded: false,
        items: []
    }
]