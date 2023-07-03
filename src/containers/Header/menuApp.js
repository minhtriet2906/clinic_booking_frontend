export const adminMenu = [
    { //user manage
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/doctor-manage'

            },
            { //Doctor's schedule manage
                name: 'menu.doctor.manage-schedule', link: '/doctor/schedule-manage'

            },
        ]
    },

    {//clinic manage
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
            }
        ]
    },

    {//specialty manage
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/specialty-manage'
            }
        ]
    },

    {//handbook manage
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook-manage'
            }
        ]
    },
];

export const doctorMenu = [
    { //Doctor's schedule manage
        name: 'menu.doctor.doctor-info',
        menus: [
            {
                name: 'menu.doctor.manage-doctor', link: '/doctor/doctor-manage'

            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/schedule-manage'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/patient-manage'
            },

        ]
    },

];