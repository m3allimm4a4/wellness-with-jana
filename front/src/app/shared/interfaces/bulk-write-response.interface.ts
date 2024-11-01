export interface BulkWriteResponse {
  insertedCount: number;
  matchedCount: number;
  modifiedCount: number;
  deletedCount: number;
  upsertedCount: number;
  upsertedIds: { [key: number]: any };
  insertedIds: { [key: number]: any };
}
