import { AppService } from './app.service';
export declare class AppController {
    private readonly dp;
    private readonly appService;
    constructor(dp: any, appService: AppService);
    getHello(): string;
    getWelcome(): string;
    login(body: {
        username: string;
        password: string;
    }): {
        code: number;
        msg: string;
    };
    testDb(): Promise<{
        status: string;
        data: any;
        error?: undefined;
    } | {
        status: string;
        error: any;
        data?: undefined;
    }>;
}
