import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { unparse } from 'papaparse';

export default class MeetDownloadRoute extends Route {
  @service db;
  async model() {
    let { meet_id } = this.paramsFor('meet');
    let results = await this.db.getResultsByMeetId(meet_id);
    let data = results.map((result) => ({
      Place: result.place,
      Time: `${result.minutes}:${result.seconds}.${result.hundredths}`,
      FirstName: result.entry.FirstName,
      LastName: result.entry.LastName,
      Gender: result.entry.Gender,
      Grade: result.entry.Grade,
      Team: result.entry.TeamName,
      Division: result.entry.DivNum
    }));
    return unparse(data, {
      quotes: false,
      delimiter: ',',
      header: true,
      newline: "\r\n",
      skipEmptyLines: true,
    });
  }

  setupController(controller, model) {
    set(controller, 'meetId', this.paramsFor('meet').meet_id);
    super.setupController(controller, model);
  }
}
