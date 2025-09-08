import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return new Response(
        JSON.stringify({ error: 'Instagram access token not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Fetching Instagram posts...');
    
    // Fetch posts from Instagram Basic Display API
    const instagramResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,thumbnail_url&limit=12&access_token=${accessToken}`
    );

    if (!instagramResponse.ok) {
      const errorText = await instagramResponse.text();
      console.error('Instagram API error:', instagramResponse.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch Instagram posts',
          details: errorText 
        }),
        { 
          status: instagramResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const instagramData = await instagramResponse.json();
    console.log('Instagram data received:', instagramData?.data?.length || 0, 'posts');

    // Transform the data to our format
    const posts: InstagramPost[] = instagramData.data?.map((post: any) => ({
      id: post.id,
      media_url: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
      permalink: post.permalink,
      caption: post.caption || '',
      media_type: post.media_type,
      thumbnail_url: post.thumbnail_url
    })) || [];

    console.log('Transformed posts:', posts.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        posts: posts.slice(0, 8) // Limit to 8 posts for the grid 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in instagram-feed function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});