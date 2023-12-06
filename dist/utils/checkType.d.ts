import { z } from "zod";
declare const _default: <T extends z.ZodType<any, z.ZodTypeDef, any>>(data: z.TypeOf<T>, schema: T) => z.TypeOf<T>;
export default _default;
