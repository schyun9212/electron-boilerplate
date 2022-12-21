import {
  scheduleJob,
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
  JobCallback,
  Job,
} from "node-schedule";

import { IDisposable } from "./lifecycle";

type ScheduleSpec = string | number | RecurrenceRule;
type ScheduleRule =
  | ScheduleSpec
  | RecurrenceSpecDateRange
  | RecurrenceSpecObjLit
  | Date;

class Scheduler implements IDisposable {
  // TODO: Determine whether we use scheduledJobs from node-schedule
  protected _jobs: { [jobName: string]: Job } = {};

  // TODO: Restrict usable timezone
  constructor() {}

  register(name: string, rule: ScheduleRule, callback: JobCallback) {
    const job = scheduleJob(name, rule, callback);

    if (name in this._jobs) {
      this._jobs[name].cancel();
    }

    this._jobs[name] = job;
  }

  cancel(name: string) {
    const job = this._jobs[name];
    if (!job) return;

    job.cancel();
    delete this._jobs[name];
  }

  cancelNext(name: string) {
    const job = this._jobs[name];
    if (!job) return;

    job.cancelNext();
  }

  reschedule(name: string, spec: ScheduleSpec) {
    const job = this._jobs[name];
    if (!job) return;

    job.reschedule(spec);
  }

  dispose(): void {
    Object.values(this._jobs).forEach((job) => job.cancel());
  }
}

export const scheduler = new Scheduler();
