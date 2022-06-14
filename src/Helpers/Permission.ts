import { usePermissions, useStore } from "react-admin";
import { log } from "./Index";

export const enum PermissionEnums {
  canCreateAgent,
  canDeleteAgent,
  canSelectAgent,
  canSelectAgentWhenCall,
  canManageUsers,
}

export const getRole = (): "admin" | "user" => "admin";

export const useCheckPermission = (permission: PermissionEnums) => {
  const { permissions } = usePermissions();
  if (permissions === "admin") {
    return roleAdmin[permission];
  } else {
    return roleUser[permission];
  }
};

export type RolePermission = {
  [key in PermissionEnums]: boolean;
};

const roleAdmin = {
  [PermissionEnums.canCreateAgent]: true,
  [PermissionEnums.canDeleteAgent]: true,
  [PermissionEnums.canSelectAgent]: true,
  [PermissionEnums.canSelectAgentWhenCall]: true,
  [PermissionEnums.canManageUsers]: true,
};

const roleUser = {
  [PermissionEnums.canCreateAgent]: false,
  [PermissionEnums.canDeleteAgent]: false,
  [PermissionEnums.canSelectAgent]: false,
  [PermissionEnums.canSelectAgentWhenCall]: false,
  [PermissionEnums.canManageUsers]: false,
};
