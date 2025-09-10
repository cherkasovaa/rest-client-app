import { decodeBase64 } from '@/shared/libs/utils/base64';
import { NextResponse, type NextRequest } from 'next/server';

async function handleProxyRequest(
  request: NextRequest,
  params: { slug?: string[] }
) {
  const slug = params.slug ?? [];
  const [method, endpoint, body] = slug;

  if (!method || !endpoint) {
    return NextResponse.json(
      { error: 'Missing method or endpoint' },
      { status: 400 }
    );
  }

  const decodedEndpoint = decodeBase64(endpoint);
  const decodedBody = decodeBase64(body);

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

    const text = await res.text();

    return NextResponse.json(
      {
        status: res.status,
        statuxText: res.statusText,
        body: text,
        headers: Object.fromEntries(res.headers.entries()),
        pl: res.ok,
      },
      {
        status: res.status,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: 'FETCH ERROR',
        message: (err as Error).message,
      },
      { status: 500 }
    );
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
