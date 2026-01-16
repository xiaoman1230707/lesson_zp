export declare class AppService {
    getHello(): string;
    getWelcome(): string;
    handleLogin(username: string, password: string): {
        code: number;
        msg: string;
    };
}
