import Projects from "./project"

export default class Activity {
    id = 0
    projectid = 0
    activityheaderid = 0
    name = ""
    createDate = new Date()
    updateDate = new Date()
    isDeleted = false
    activityHeader: Activity | null = null; // มีตัวเดียว
    inverseActivityHeader:Activity[] = [] // มีหลายตัว
    project : Projects | null = null; // มีตัวเดียว
    lv = 1;
}