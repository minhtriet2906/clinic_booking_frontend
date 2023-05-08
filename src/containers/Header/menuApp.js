export const adminMenu = [
    { //user manage
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/doctor-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user_admin'
            // },
            { //Doctor's schedule manage
                name: 'menu.doctor.manage-schedule',
                menus: [
                    {
                        name: 'menu.doctor.schedule', link: '/system/user-manage'
                    },

                ]
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

export const doctorMenu = [
    { //Doctor's schedule manage
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/schedule-manage'
            },

        ]
    },

];