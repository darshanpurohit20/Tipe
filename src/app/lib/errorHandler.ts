interface PydanticErrorDetail {
  type: string;
  loc: (string | number)[];
  msg: string;
  input: any;
}

interface ApiErrorResponse {
  detail?: string | PydanticErrorDetail[];
  message?: string;
  error?: string;
}

/**
 * Extract human-readable error message from API response
export function getErrorMessage(error: any): string {
  // Handle Pydantic validation errors
  if (error?.response?.data?.detail) {
    const detail = error.response.data.detail;

    if (Array.isArray(detail)) {
      // Multiple validation errors - get first one
      const firstError = detail[0] as PydanticErrorDetail;
      return firstError?.msg || 'Validation error';
    }

    if (typeof detail === 'string') {
      return detail;
    }
  }

  // Handle standard error message fields
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  // Handle generic error response
  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Safely extract and format API response for display
 * Prevents rendering raw objects that cause React crashes
 */
export function formatApiResponse(response: any): string {
  // If it's already a string, return it
  if (typeof response === 'string') {
    return response;
  }

  // If it's an object, extract meaningful content
  if (typeof response === 'object' && response !== null) {
    // Try to get a meaningful field
    if (response.answer) return response.answer;
    if (response.response) return response.response;
    if (response.message) return response.message;
    if (response.text) return response.text;
    if (response.data) return formatApiResponse(response.data);

    // Fallback to JSON string for debugging
    try {
      return JSON.stringify(response, null, 2);
    } catch {
      return 'Unable to parse response';
    }
  }

  return String(response);
}
