import { request } from '../utils/request';

interface UtmsData {
    acid: string | null;
    utms: {
        rcpSource: string | null;
        rcpMedium: string | null;
        rcpCampaign: string | null;
        rcpContent: string | null;
        rcpTerm: string | null;
    };
}

export const pushUtms = async (data: UtmsData) => {
    const response = await request({
        method: 'POST',
        path: '/utms',
        body: data
    });

    return response.data;

}; 