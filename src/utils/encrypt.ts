import * as bcrypt from "bcrypt";

const hash = {
  salt: async function () {
    return await bcrypt.genSalt();
  },
  make: async function (params: any): Promise<any> {
    const saltRounds = await this.salt();
    return await bcrypt.hash(params.password, saltRounds);
  },
  compare: async function ({value, hash}:{ value: string; hash: string }): Promise<any> {
    return await bcrypt.compare(value, hash);
  },
};

export { hash };
