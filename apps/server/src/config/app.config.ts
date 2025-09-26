import { getEnv } from "../utils/getEnv";

const shared_config = {
    port: getEnv("PORT", "3000"),

}



const dev_config = {
    ...shared_config,
}


const prod_config = {
    ...shared_config,
}