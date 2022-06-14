export const mockdata = {
  agents: [
    {
      id: "1",
      extensionNumber: "001",
      deviceNumber: "001",
      userAccount: "raymond",
      remark: "Remark",
      createDate: "2022-01-01",
    },
  ],
  users: [
    {
      id: "1",
      userAccount: "joanna001",
      name: "joanna",
      remark: "Remark",
      createDate: "2022-01-01",
    },
  ],
  reports: [
    {
      id: 1,
      agentId: 1,
      userName: "ray",
      incomingCall: 1,
      outboundCall: 1,
      callTime: 180,
    },
    {
      id: 2,
      agentId: 2,
      userName: "ray2",
      incomingCall: 12,
      outboundCall: 12,
      callTime: 280,
    },
  ],
};
