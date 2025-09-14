import { saveRequestToDb } from '@/shared/api/saveRequestToDb';
import { authConfig } from '@/shared/config/firebaseConfig';
import type { HttpMethod } from '@/shared/config/httpSettings';
import { decodeBase64 } from '@/shared/libs/utils/base64';
import type { RequestData } from '@/shared/types/request-data-firebase';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

async function handleProxyRequest(
  request: NextRequest,
  params: { slug?: string[] }
) {
  const startTime = Date.now();
  const slug = params.slug ?? [];
  const [method, endpoint, body] = slug;

  if (!method || !endpoint) {
    return NextResponse.json(
      { error: 'Missing method or endpoint' },
      { status: 400 }
    );
  }

  const decodedEndpoint = decodeBase64(endpoint);
  const decodedBody = body ? decodeBase64(body) : null;

  const tokens = await getTokens(await cookies(), authConfig);

  const requestData: RequestData = {
    duration: 0,
    statusCode: 0,
    requestTimestamp: new Date().toISOString(),
    requestMethod: method as HttpMethod,
    requestSize: 0,
    responseSize: 0,
    errorDetails: null,
    endpoint: decodedEndpoint,
    requestBody: decodedBody ?? '',
    requestHeaders: {},
  };

  try {
    const searchParams = request.nextUrl.searchParams;
    const headers: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      headers[key] = value;
    });

    const res = await fetch(decodedEndpoint, {
      method,
      headers: Object.keys(headers).length ? headers : undefined,
      body: body && method !== 'GET' ? decodedBody : undefined,
    });

    const duration = Date.now() - startTime;
    requestData.duration = duration;

    requestData.statusCode = res.status;
    requestData.requestSize = decodedBody
      ? Buffer.byteLength(decodedBody, 'utf8')
      : 0;

    const text = await res.text();
    requestData.responseSize = Buffer.byteLength(text, 'utf8');
    requestData.errorDetails = res.ok ? null : res.statusText;
    requestData.requestHeaders = headers;

    return NextResponse.json(
      {
        status: res.status,
        statusText: res.statusText,
        body: text,
        headers: Object.fromEntries(res.headers.entries()),
        ok: res.ok,
      },
      {
        status: res.status,
      }
    );
  } catch (err) {
    const duration = Date.now() - startTime;
    const { name, message } = err as Error;

    requestData.duration = duration;
    requestData.errorDetails = message;
    requestData.statusCode = 500;

    return NextResponse.json(
      {
        status: 500,
        body: JSON.stringify({ error: name, message }),
      },
      { status: 500 }
    );
  } finally {
    if (tokens?.decodedToken?.uid) {
      await saveRequestToDb(tokens.decodedToken.uid, requestData);
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  return handleProxyRequest(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  return handleProxyRequest(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  return handleProxyRequest(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  return handleProxyRequest(request, await params);
}
