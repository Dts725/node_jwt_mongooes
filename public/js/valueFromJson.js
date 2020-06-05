/**
 * Created by tatc on 2017/12/8.
 */

var documentName = [dzzsj, dysj, zzdysj, szsj, tddjsj, tddj, qyhdjsj];

var arrField0a = [
    ["党组织名称", "name"]
];
var arrField0b = [
    ["党组织名称", "name"], ["书记姓名", "secretary"], ["联系人", "linkman"],
    ["联系电话", "phone"], ["党员数量", "member_count"],
   
];

// var arrField0b = [
//     ["党组织名称", "name"],
//     ["书记姓名", "secretary"],
//     ["联系人", "linkman"],
//     ["联系电话", "phone"],
//     ["组织类别", "industry"],
//     ["简介", "summary"],
//     ["党员数量", "number"],
//     ["三会一课", "three"],
//     ["主题党日", "topic"]
// ];

// var arrField0c = [
//     ["党组织名称", "party_name"], ["书记姓名", "secretary_name"], ["联系人", "person"],
//     ["联系电话", "phone"], ["组织类别", "category"], ["最近换届时间", "last_time"], ["换届期限", "deadline"],
//     ["到届时间", "expire"], ["地址", "address"], ["简介", "summary"], ["党员数量", "number"],
//     ["三会一课", "three"], ["主题党日", "topic"], ["民主评议", "deliberate"], ["谈心谈话", "talking"]
// ];

// var arrField0c = [
//     ["党组织名称", "party_name"], ["书记姓名", "secretary_name"], ["联系人", "person"],
//     ["联系电话", "phone"],
//      ["地址", "address"], ["党员数量", "member_count"],
    
// ];

var arrField1a = [
    ["姓名", "name"], ["性别", "sex"], ["所属支部", "organization_name"], ["住址", "address"]
];
var arrField1b = [
    ["姓名", "name"], ["学历", "record"], ["出生日期", "birth"], ["性别", "sex"], ["所属支部", "organization_name"], ["民族", "nationality"],
    ["健康状况", "health"], ["入党时间", "party_time"], ["住址", "address"], ["三会一课参加情况", "orglife_join_precent"], ["主题党日参与情况", "thematic_join_precent"]
];//["民主评议情况", "deliberate"],["党籍状态", "status"],["党费缴纳情况", "money"],["党内职务", "job"], ["电话", "phone"], ["",""],
var arrField1c = [
    ["活动名称", "act_name"], ["活动日期", "act_date"], ["类型", "act_category"],
    ["所属组织", "act_address"], ["参加人数", "act_attendance"]
];
var arrField1d = [
    ["活动主题", "act_title"], ["活动时间", "act_date"]
];


var arrField2a = [
    ["姓名", "name"], ["性别", "sex"],
    ["住址", "address"]
];
//用来添加显示字段 ["认领岗位", "claimPosition"]
var arrField2b = [
    ["姓名", "name"], ["性别", "sex"], ["学历", "record"], ["民族", "nationality"],
    ["工作单位", "job_unit"], ["入党日期", "party_time"], ["地址", "address"] //, ["出生日期", "brithday"]
];

var arrField3a = [
    ["姓名", "name"], ["性别", "sex"], ["职务", "job"], ["住址", "address"]
];
var arrField3b = [
    ["姓名", "name"], ["职务", "job"], ["性别", "sex"], ["政治面貌", "political"],
    ["是否退休", "is_retire"], ["出生日期", "birth"], ["住址", "address"]
];

var arrField4a = [
    ["团队名称", "team_name"], ["团队类型", "type"],
    ["团队人数", "team_number"], ["负责人", "team_leader"]
];
var arrField4b = [
    ["团队名称", "team_name"], ["团队类型", "type"], ["团队简介", "team_intro"],
    ["负责人", "team_leader"], ["负责人政治面貌", "team_leader_political"], ["团队人数", "team_number"], ["录入日期", "create_time"]
];
var arrField4c = [
    ["姓名", "name"], ["联系地址", "address"], ["所属团队", "group"]

];
var arrField5a = [
    ["单位名称", "community_name"], ["单位地址", "unit_address"]
];
var arrField5b = [
    ["单位名称", "unit_name"],
     ["单位LOGO", "icon"],
     ["单位门头照", "showcase_image"],
     ["单位简介", "intro"],
    ["单位地址", "address"]
    // , ["项目名称", "project_name"], ["认领项目", "project_name"], ["项目内容", "children.content"]
];

var arrField6a = [
    ["姓名", "name"],
    ["性别", "sex"],
    ["所属居委会", "address"],
    
];
var arrField6b = [
    ['照片', 'image'], ["姓名", "name"], ['年龄', 'age'], ["性别", "sex"], ['服务理念', 'service_purposes'], ['委员数', 'committee_member_count'],
    ['副书记数', 'deputy_secretary_count'], ['兼副书记数', 'parttime_deputy_secretary_count'], ['中共党员', 'party_member_in_workers_count'],
    ["职务", "job"],  ["职责", "duty"],
    ["工作地址", "address"], ["手机号", "phone"], ["党组织名称", "organization_name"]
];


var arrFieldPoint = [
    ["x", "x"], ["y", "y"], ["sort", "sort"]
];

//分页路由

var dzhUrlList = ['organization', 'party_member', 'incumbent_party_member', 'three_work', 'community_team', 'region_unit', 'secretary'];
var comminty = 'region_unit_alone';
// var dzhUrlList = ['organization', 'party_member', 'incumbent_party_member', 'three_work', 'community_team', '区域化党建', 'secretary'];





