import { TeradataConnection/*, ITDConnParams*/} from 'teradata-nodejs-driver';
import { Connection } from '../SettingStore'
import AbstractClient, { RawField } from './AbstractClient'
// eslint-disable-next-line @typescript-eslint/no-var-requires

export default class TeradataClient extends AbstractClient {
  getTables(): Promise<string[]> {
      throw new Error('Method not implemented.');
  }
  getColumns(tableName: string): Promise<RawField[]> {
      console.log(tableName);
      throw new Error('Method not implemented.');
  }
  connection: TeradataConnection = new TeradataConnection()

  constructor(settings: Connection) {
    super(settings)
  }

  get DefaultPort() {
    return 3306
  }
  get DefaultHost() {
    return '127.0.0.1'
  }
  get DefaultUser() {
    return 'root'
  }

  async connect() {
    this.connection.connect({
      host: this.settings.host || this.DefaultHost,
      log: '0',
      password: this.settings.password || '',
      user: this.settings.user || this.DefaultUser,
    })
    return true
  }

  disconnect() {
    if (this.connection) {
      this.connection.close()
    }
  }

//   getTables(): Promise<string[]> {
//     // const sql = `
//     //   SELECT table_name 
//     //   FROM information_schema.tables
//     //   WHERE table_schema = '${this.settings.database}'
//     // `
//     // return new Promise((resolve, reject) => {
//     //   if (!this.connection) {
//     //     reject(new Error("Don't have database connection."))
//     //     return
//     //   }
//     //   this.connection.query(
//     //     sql,
//     //     (err, results: { [key: string]: string }[]) => {
//     //       if (err) {
//     //         reject(new Error(err.message))
//     //         return
//     //       }
//     //       const tables = results.map((v) => v['table_name'] || v['TABLE_NAME'])
//     //       resolve(tables)
//     //     }
//     //   )
//     // })
//   }

//   getColumns(tableName: string): Promise<RawField[]> {
//     const sql = `SHOW FULL FIELDS FROM ${tableName}`
//     return new Promise((resolve, reject) => {
//       if (!this.connection) {
//         reject(new Error("Don't have database connection."))
//         return
//       }
//       this.connection.query(sql, (err, results) => {
//         if (err) {
//           reject(new Error(err.message))
//           return
//         }
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const columns: RawField[] = (results as any).map((v: any) => ({
//           field: v.Field,
//           type: v.Type,
//           null: v.Null,
//           default: v.Default,
//           comment: v.Comment,
//         }))
//         resolve(columns)
//       })
//     })
//   }
}
