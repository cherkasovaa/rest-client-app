import { NextResponse, type NextRequest } from 'next/server';

async function handleProxyRequest(
  request: NextRequest,
  params: { slug?: string[] }
) {
  const slug = params.slug ?? [];
  const [method, encodedEndpoint, body] = slug;

  if (!method || !encodedEndpoint) {
    return NextResponse.json(
      { error: 'Missing method or endpoint' },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({});
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
