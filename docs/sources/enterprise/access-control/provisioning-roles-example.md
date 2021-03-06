---
title: 'Example role configuration file using Grafana provisioning'
menuTitle: 'Provisioning roles example'
description: 'View an example YAML provisioning file that configures Grafana role assignments.'
aliases: []
weight: 60
---

# Example role configuration file using Grafana provisioning

The following example shows a complete YAML configuration file that:

- Removes a default role assignment
- Adds a default role assignment
- Deletes custom roles
- Adds custom roles to basic roles
- Adds a custom role to a fixed role

## Example

```yaml
# config file version
apiVersion: 1

# list of default basic role assignments that should be removed
removeDefaultAssignments:
  # <string>, must be one of the Organization roles (`Viewer`, `Editor`, `Admin`) or `Grafana Admin`
  - builtInRole: 'Grafana Admin'
    # <string>, must be one of the existing fixed roles
    fixedRole: 'fixed:permissions:admin'

# list of default basic role assignments that should be added back
addDefaultAssignments:
  # <string>, must be one of the Organization roles (`Viewer`, `Editor`, `Admin`) or `Grafana Admin`
  - builtInRole: 'Admin'
    # <string>, must be one of the existing fixed roles
    fixedRole: 'fixed:reporting:admin:read'

# list of roles that should be deleted
deleteRoles:
  # <string> name of the role you want to create. Required if no uid is set
  - name: 'custom:reports:editor'
    # <string> uid of the role. Required if no name
    uid: 'customreportseditor1'
    # <int> org id. will default to Grafana's default if not specified
    orgId: 1
    # <bool> force deletion revoking all grants of the role
    force: true
  - name: 'custom:global:reports:reader'
    uid: 'customglobalreportsreader1'
    # <bool> overwrite org id and removes a global role
    global: true
    force: true

# list of roles to insert/update depending on what is available in the database
roles:
  # <string, required> name of the role you want to create. Required
  - name: 'custom:users:editor'
    # <string> uid of the role. Has to be unique for all orgs.
    uid: customuserseditor1
    # <string> description of the role, informative purpose only.
    description: 'Role for our custom user editors'
    # <int> version of the role, Grafana will update the role when increased
    version: 2
    # <int> org id. will default to Grafana's default if not specified
    orgId: 1
    # <list> list of the permissions granted by this role
    permissions:
      # <string, required> action allowed
      - action: 'users:read'
        #<string> scope it applies to
        scope: 'users:*'
      - action: 'users:write'
        scope: 'users:*'
      - action: 'users:create'
        scope: 'users:*'
    # <list> list of basic roles the role should be assigned to
    builtInRoles:
      # <string, required> name of the basic role you want to assign the role to
      - name: 'Editor'
        # <int> org id. will default to the role org id
        orgId: 1
  - name: 'custom:global:users:reader'
    uid: 'customglobalusersreader1'
    description: 'Global Role for custom user readers'
    version: 1
    # <bool> overwrite org id and creates a global role
    global: true
    permissions:
      - action: 'users:read'
        scope: 'users:*'
    builtInRoles:
      - name: 'Viewer'
        orgId: 1
      - name: 'Editor'
        # <bool> overwrite org id and assign role globally
        global: true
  - name: fixed:users:writer
    global: true
    # <list> list of teams the role should be assigned to
    teams:
      - name: 'user editors'
        orgId: 1
```
