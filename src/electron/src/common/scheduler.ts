import {
  scheduleJob,
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
  JobCallback,
  Job,
} from "node-schedule";

import { IDisposable } from "./lifecycle";

export type ScheduleSpec = string | number | RecurrenceRule;
export type ScheduleRule =
  | ScheduleSpec
  | RecurrenceSpecDateRange
  | RecurrenceSpecObjLit
  | Date;

export class Scheduler implements IDisposable {
  protected _jobs: { [jobName: string]: Job } = {};

  constructor() {}

  schedule(
    name: string,
    rule: ScheduleRule,
    callback: JobCallback
  ): string | undefined {
    const job = scheduleJob(name, rule, callback);

    if (name in this._jobs) {
      this._jobs[name].cancel();
    }

    this._jobs[name] = job;
    return job.name;
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
