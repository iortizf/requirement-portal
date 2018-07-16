export class Meeting {
    title: string;
    description: string;
    firequestid: number;
    fibinnaclemeetingid: number;
    fimeetingtypeid: number;
    ficomplexityid: number;
    fiproductid: number;
    fipriorityid: number;
    fititleinterviewid: number;
    fddate: string;
    fcbusinessengineer: string;
    fdscheduledate: string;
    fdfinaldate: string;
    fccomments: string;
    fcinterviewer: string;
    fcstatus: string;
}

export interface SingleMeeting{
    title: string,
    color: any,
    start: Date,
    id: number
}
