import {OB11GroupMember} from '../types';
import {getGroup} from "../../common/data";
import {NTQQApi} from "../../ntqqapi/ntcall";
import {OB11Constructor} from "../constructor";
import BaseAction from "./BaseAction";
import {ActionName} from "./types";

export interface PayloadType {
    group_id: number
}


class GetGroupMemberList extends BaseAction<PayloadType, OB11GroupMember[]> {
    actionName = ActionName.GetGroupMemberList

    protected async _handle(payload: PayloadType){
        const group = await getGroup(payload.group_id.toString());
        if (group) {
            if (!group.members?.length) {
                group.members = await NTQQApi.getGroupMembers(payload.group_id.toString())
            }
            return OB11Constructor.groupMembers(group);
        }
        else {
            throw (`群${payload.group_id}不存在`)
        }
    }
}

export default GetGroupMemberList