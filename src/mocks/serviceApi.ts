// Mock service request and auth API for front-end-only POC

export type ServiceRequestStatus =
  | "submitted"
  | "accepted"
  | "scheduled"
  | "tech_on_the_way"
  | "in_progress"
  | "completed"
  | "billed"
  | "paid";

export type Urgency = "today" | "soon" | "routine" | "";

export interface CustomerUser {
  id: string;
  email: string;
  name?: string;
  authProvider: "email" | "apple" | "google";
}

export interface TechUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "tech";
}

export interface ServiceRequestClientInfo {
  name: string;
  email?: string;
  phone?: string;
  hasAccount: boolean;
  accountId?: string;
}

export interface ServiceRequestVehicleInfo {
  description: string;
  mileage?: string;
}

export interface ServiceRequestDetails {
  concern: string;
  whenStarted?: string;
  dashLights?: string;
  preferredTime?: string;
  urgency?: Urgency;
}

export interface ServiceRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  client: ServiceRequestClientInfo;
  vehicle: ServiceRequestVehicleInfo;
  details: ServiceRequestDetails;
  status: ServiceRequestStatus;
  assignedTechId?: string;
}

interface MockState {
  serviceRequests: ServiceRequest[];
  customerUsers: CustomerUser[];
  techUsers: TechUser[];
}

const STORAGE_KEY = "aceauto-mock-state-v1";

export const DEMO_CUSTOMERS: CustomerUser[] = [
  {
    id: "cust_driver_richmond",
    email: "driver.richmond@example.com",
    name: "Richmond Driver",
    authProvider: "email",
  },
  {
    id: "cust_fleet_manager",
    email: "fleet.manager@example.com",
    name: "Fleet Manager",
    authProvider: "email",
  },
];

const DEMO_TECHS: TechUser[] = [
  {
    id: "tech_admin_1",
    name: "Shop Admin",
    email: "admin@aceauto.example",
    role: "admin",
  },
  {
    id: "tech_jordan",
    name: "Jordan (Tech)",
    email: "tech.jordan@aceauto.example",
    role: "tech",
  },
  {
    id: "tech_riley",
    name: "Riley (Tech)",
    email: "tech.riley@aceauto.example",
    role: "tech",
  },
];

function createInitialRequests(): ServiceRequest[] {
  const now = new Date().toISOString();
  return [
    {
      id: "REQ-1001",
      createdAt: now,
      updatedAt: now,
      client: {
        name: "Richmond Driver",
        email: "driver.richmond@example.com",
        hasAccount: true,
        accountId: "cust_driver_richmond",
      },
      vehicle: {
        description: "2014 Honda Accord EX-L",
        mileage: "145,200",
      },
      details: {
        concern: "Check engine light on, slight rough idle at stop lights.",
        whenStarted: "Started earlier this week, seems about the same.",
        dashLights: "Check engine light is solid, nothing flashing.",
        preferredTime: "Tomorrow after 9am",
        urgency: "soon",
      },
      status: "accepted",
      assignedTechId: "tech_jordan",
    },
    {
      id: "REQ-1002",
      createdAt: now,
      updatedAt: now,
      client: {
        name: "Fleet Manager",
        email: "fleet.manager@example.com",
        hasAccount: true,
        accountId: "cust_fleet_manager",
      },
      vehicle: {
        description: "2019 Ford Transit (fleet van)",
        mileage: "82,340",
      },
      details: {
        concern: "Brake squeal under light braking, worse when loaded.",
        whenStarted: "Noticed over the last month.",
        dashLights: "No warning lights.",
        preferredTime: "This week, mornings",
        urgency: "soon",
      },
      status: "scheduled",
      assignedTechId: "tech_riley",
    },
  ];
}

function loadInitialState(): MockState {
  if (typeof window === "undefined") {
    return {
      serviceRequests: createInitialRequests(),
      customerUsers: DEMO_CUSTOMERS.slice(),
      techUsers: DEMO_TECHS.slice(),
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        serviceRequests: createInitialRequests(),
        customerUsers: DEMO_CUSTOMERS.slice(),
        techUsers: DEMO_TECHS.slice(),
      };
    }
    const parsed = JSON.parse(raw) as MockState;
    return {
      serviceRequests: parsed.serviceRequests ?? createInitialRequests(),
      customerUsers: parsed.customerUsers?.length ? parsed.customerUsers : DEMO_CUSTOMERS.slice(),
      techUsers: parsed.techUsers?.length ? parsed.techUsers : DEMO_TECHS.slice(),
    };
  } catch {
    return {
      serviceRequests: createInitialRequests(),
      customerUsers: DEMO_CUSTOMERS.slice(),
      techUsers: DEMO_TECHS.slice(),
    };
  }
}

// Note: state is mutated for simplicity in this front-end-only mock.
// ESLint prefers const here, but we intentionally keep this as a mutable
// module-level variable to avoid overcomplicating the POC.
// eslint-disable-next-line prefer-const
let state: MockState = loadInitialState();

function persistState() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors in POC
  }
}

function generateRequestId(): string {
  const base = 1000 + state.serviceRequests.length + Math.floor(Math.random() * 50);
  return `REQ-${base}`;
}

export function listTechUsers(): TechUser[] {
  return state.techUsers.slice();
}

export function listDemoCustomers(): CustomerUser[] {
  return state.customerUsers.slice();
}

export function findCustomerByEmail(email: string): CustomerUser | undefined {
  return state.customerUsers.find((c) => c.email.toLowerCase() === email.toLowerCase());
}

export function ensureCustomer(email: string, name?: string, provider: CustomerUser["authProvider"] = "email"): CustomerUser {
  const existing = findCustomerByEmail(email);
  if (existing) return existing;

  const newCustomer: CustomerUser = {
    id: `cust_${Math.random().toString(36).slice(2, 9)}`,
    email,
    name,
    authProvider: provider,
  };
  state.customerUsers.push(newCustomer);
  persistState();
  return newCustomer;
}

export interface SubmitServiceRequestInput {
  client: Omit<ServiceRequestClientInfo, "hasAccount" | "accountId"> & {
    hasAccount?: boolean;
    accountId?: string;
  };
  vehicle: ServiceRequestVehicleInfo;
  details: ServiceRequestDetails;
}

export async function submitServiceRequest(input: SubmitServiceRequestInput): Promise<ServiceRequest> {
  const now = new Date().toISOString();

  const request: ServiceRequest = {
    id: generateRequestId(),
    createdAt: now,
    updatedAt: now,
    client: {
      name: input.client.name,
      email: input.client.email,
      phone: input.client.phone,
      hasAccount: Boolean(input.client.accountId),
      accountId: input.client.accountId,
    },
    vehicle: {
      description: input.vehicle.description,
      mileage: input.vehicle.mileage,
    },
    details: {
      concern: input.details.concern,
      whenStarted: input.details.whenStarted,
      dashLights: input.details.dashLights,
      preferredTime: input.details.preferredTime,
      urgency: input.details.urgency,
    },
    status: "submitted",
  };

  state.serviceRequests.push(request);
  persistState();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return request;
}

export async function listCustomerRequests(customerId: string): Promise<ServiceRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return state.serviceRequests.filter((r) => r.client.accountId === customerId);
}

export async function listAllRequestsForAdmin(): Promise<ServiceRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  // newest first
  return state.serviceRequests
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function listRequestsForTech(techId: string): Promise<ServiceRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return state.serviceRequests.filter((r) => r.assignedTechId === techId);
}

export async function getRequestByIdForContact(params: {
  requestId: string;
  emailOrPhone: string;
}): Promise<ServiceRequest | null> {
  const { requestId, emailOrPhone } = params;
  await new Promise((resolve) => setTimeout(resolve, 300));

  const target = state.serviceRequests.find((r) => r.id === requestId.trim());
  if (!target) return null;

  const matchEmail = target.client.email && emailOrPhone &&
    emailOrPhone.includes("@") &&
    target.client.email.toLowerCase() === emailOrPhone.toLowerCase();

  const matchPhone = target.client.phone &&
    !emailOrPhone.includes("@") &&
    target.client.phone.replace(/[^0-9]/g, "") === emailOrPhone.replace(/[^0-9]/g, "");

  return matchEmail || matchPhone ? target : null;
}

export async function assignRequest(params: {
  requestId: string;
  techId: string;
}): Promise<ServiceRequest | null> {
  const { requestId, techId } = params;
  await new Promise((resolve) => setTimeout(resolve, 250));

  const req = state.serviceRequests.find((r) => r.id === requestId);
  if (!req) return null;

  req.assignedTechId = techId;
  if (req.status === "submitted") {
    req.status = "accepted";
  }
  req.updatedAt = new Date().toISOString();
  persistState();
  return req;
}

export function getNextStatus(current: ServiceRequestStatus): ServiceRequestStatus {
  const order: ServiceRequestStatus[] = [
    "submitted",
    "accepted",
    "scheduled",
    "tech_on_the_way",
    "in_progress",
    "completed",
    "billed",
    "paid",
  ];
  const idx = order.indexOf(current);
  if (idx === -1 || idx === order.length - 1) return current;
  return order[idx + 1];
}

export async function updateRequestStatus(params: {
  requestId: string;
  status: ServiceRequestStatus;
}): Promise<ServiceRequest | null> {
  const { requestId, status } = params;
  await new Promise((resolve) => setTimeout(resolve, 200));

  const req = state.serviceRequests.find((r) => r.id === requestId);
  if (!req) return null;

  req.status = status;
  req.updatedAt = new Date().toISOString();
  persistState();
  return req;
}

export function getStatusLabel(status: ServiceRequestStatus): string {
  switch (status) {
    case "submitted":
      return "Submitted";
    case "accepted":
      return "Accepted";
    case "scheduled":
      return "Scheduled";
    case "tech_on_the_way":
      return "Tech on the way";
    case "in_progress":
      return "In progress";
    case "completed":
      return "Completed";
    case "billed":
      return "Billed";
    case "paid":
      return "Paid";
    default:
      return status;
  }
}
