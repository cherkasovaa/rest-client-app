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
    requestBody: decodedBody,
    requestHeaders: {},
  };

  try {
    const searchParams = request.nextUrl.searchParams;
    const headers: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      headers[key] = value;
    });

    const requestSize = decodedBody ? new Blob([decodedBody]).size : 0;
    requestData.requestSize = requestSize;
    requestData.requestHeaders = headers;

    const res = await fetch(decodedEndpoint, {
      method,
      headers: Object.keys(headers).length ? headers : undefined,
      body: body && method !== 'GET' ? decodedBody : undefined,
    });

    const text = await res.text();
    const duration = Date.now() - startTime;

    requestData.duration = duration;
    requestData.statusCode = res.status;
    requestData.responseSize = new Blob([text]).size;
    requestData.errorDetails = res.ok ? null : res.statusText;

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
    const errorMessage = (err as Error).message;

    requestData.duration = duration;
    requestData.errorDetails = errorMessage;

    return NextResponse.json(
      {
        error: 'FETCH ERROR',
        message: errorMessage,
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
