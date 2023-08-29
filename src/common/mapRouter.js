import { HomeFilled, UserDeleteOutlined, TeamOutlined, MailOutlined, MehOutlined ,ProfileOutlined,FileTextOutlined,FormOutlined,UnorderedListOutlined,CarOutlined,AccountBookOutlined} from "@ant-design/icons"

export const asyncRouterMap = [
    {
        path: "/home",
        meta: { title: "首页", role: ['admin', "teacher", "manager"] },
        icon: <HomeFilled />
    },
    {
        path: "/personal",
        meta: { title: "个人中心", role: ['admin', "teacher", "manager"] },
        icon: <UserDeleteOutlined />
    },
    {
        path: "/teacher",
        meta: { title: "教师管理", role: ['admin'] },
        icon: <TeamOutlined />
    },
    {
        path: "/admissions",
        meta: { title: "招生管理", role: ['admin', "manager"] },
        icon: <MailOutlined />,
        children: [
            {
                path: "/admissions/intentional",
                meta: { title: "意向学员管理", role: ['admin', "manager"] },
                icon: <MehOutlined />
            },
            {
                path: "/admissions/solicitation",
                meta: { title: "邀约查询", role: ['admin', "manager"] },
                icon:<ProfileOutlined />
            },
        ]
    },
    {
        path: "/student",
        meta: { title: "学生管理", role: ['admin', "teacher", "manager"] },
        icon: <MailOutlined />,
        children: [
            {
                path: "/student/info",
                meta: { title: "学生信息", role: ['admin', "teacher", "manager"] },
                icon:<FileTextOutlined />
            },
            {
                path: "/student/exam",
                meta: { title: "考试管理", role: ['admin', "teacher"] },
                icon:<FormOutlined />
            },
        ]
    },
    {
        path: "/class",
        meta: { title: "排课管理", role: ['admin'] },
        icon:<UnorderedListOutlined />
    },
    {
        path: "/administrative",
        meta: { title: "行政管理", role: ['admin'] },
        icon:<CarOutlined />
    },
    {
        path: "/finance",
        meta: { title: "财务管理", role: ['admin'] },
        icon:<AccountBookOutlined />
    },
]