export const adminMenu = [
    { //user manage
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user_manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user_redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/doctor_manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user_manage', link: '/system/user_manage' },
                //     { name: 'menu.system.system-administrator.user_redux', link: '/system/user_redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user_admin'
            },
        ]
    },

    {//clinic manage
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic_manage'
            }
        ]
    },

    {//specialty manage
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/specialty_manage'
            }
        ]
    },

    {//handbook manage
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook_manage'
            }
        ]
    },
];