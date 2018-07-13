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

    public toString = () : string => {

        return `Meeting (title: ${this.title},
                         description: ${this.description},
                         firequestid: ${this.firequestid},
                         fibinnaclemeetingid: ${this.fibinnaclemeetingid},
                         fimeetingtypeid: ${this.fimeetingtypeid},
                         ficomplexityid: ${this.ficomplexityid},
                         fiproductid: ${this.fiproductid},
                         fipriorityid: ${this.fipriorityid},
                         fititleinterviewid: ${this.fititleinterviewid},
                         fddate: ${this.fddate},
                         fcbusinessengineer: ${this.fcbusinessengineer},
                         fdscheduledate: ${this.fdscheduledate},
                         fdfinaldate: ${this.fdfinaldate},
                         fccomments: ${this.fccomments},
                         fcinterviewer: ${this.fcinterviewer},
                         fcstatus: ${this.fcstatus}
                        )`;
    }
}
