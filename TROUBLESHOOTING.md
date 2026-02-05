# Service Worker Troubleshooting Guide

## Common Service Worker Issues & Fixes

### Issue: "Service Worker registration failed"

This can happen for several reasons:

#### 1. **HTTPS Required (Most Common)**
Service Workers only work on:
- `https://` websites (secure)
- `localhost` or `127.0.0.1` (local testing)

**Solution:**
- Deploy to GitHub Pages, Netlify, or Vercel (all provide HTTPS)
- For local testing, use: `http://localhost:8000` or `http://127.0.0.1:8000`
- Don't use: `http://192.168.x.x` or other local IP addresses

#### 2. **File Path Issues**
Service worker needs correct file paths.

**Solution:** Make sure `sw.js` is in the same directory as `index.html`

#### 3. **Browser Cache**
Old service worker might be cached.

**Solution:**
- Open DevTools (F12)
- Go to Application tab → Service Workers
- Click "Unregister" on any old service workers
- Check "Update on reload"
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

#### 4. **Missing Icons**
Service worker tries to cache icons that don't exist yet.

**Solution:** This is already fixed in the updated sw.js - it no longer tries to cache icons

## Testing Service Worker

### Check if it's working:
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for: "Service Worker registered"
4. Go to **Application** tab → Service Workers
5. You should see your service worker listed as "activated"

### Network test:
1. Open the app
2. Open DevTools → Network tab
3. Refresh page
4. Look for resources with "(ServiceWorker)" label
5. Turn off WiFi/internet
6. Refresh - app should still work! ✅

## Quick Fix: Disable Service Worker

If you want to test the app without service worker (it will still work fine, just won't work offline):

### Option 1: Comment out registration
In `index.html`, find this code and comment it out:

```html
<script>
    // Service Worker disabled for testing
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.log('Service Worker registration failed:', err));
        });
    }
    */

    // Set today's date as default
    document.getElementById('betDate').valueAsDate = new Date();
</script>
```

### Option 2: Remove from manifest
In `manifest.json`, you can simplify it (but service worker won't affect basic functionality anyway).

## Deployment-Specific Fixes

### GitHub Pages
```
✅ Automatically provides HTTPS
✅ No configuration needed
✅ Service workers work out of the box
```

### Netlify
```
✅ Automatically provides HTTPS
✅ No configuration needed
✅ Works with drag & drop deployment
```

### Vercel
```
✅ Automatically provides HTTPS
✅ No configuration needed
✅ Instant SSL certificate
```

### Local Testing
```
✅ Use localhost:8000
❌ Don't use IP address like 192.168.1.x
❌ Don't use http://yourcomputer.local

Run local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## Browser Support

Service Workers work in:
- ✅ Chrome/Edge 45+
- ✅ Firefox 44+
- ✅ Safari 11.1+
- ✅ Mobile Chrome
- ✅ Mobile Safari (iOS 11.3+)

## Error Messages & Solutions

### "Failed to register a ServiceWorker: The script has an unsupported MIME type"
**Problem:** Server returning wrong content type
**Solution:** 
- Deploy to proper hosting (GitHub Pages, Netlify, Vercel)
- Make sure `sw.js` is actually a JavaScript file

### "Failed to register a ServiceWorker: An SSL certificate error occurred"
**Problem:** Invalid HTTPS certificate
**Solution:**
- Use hosting platforms with automatic SSL
- For custom domain, ensure SSL is properly configured

### "Failed to register a ServiceWorker: The path of the provided scope is not under the max scope"
**Problem:** Service worker trying to control files outside its directory
**Solution:** 
- Keep `sw.js` in root directory with `index.html`
- Use relative paths: `./sw.js` not `/sw.js`

### "DOMException: Failed to execute 'addAll' on 'Cache'"
**Problem:** Files in cache list don't exist
**Solution:** 
- Already fixed in updated sw.js!
- Icons are no longer in cache list
- Only essential files are cached

## PWA Installation Without Service Worker

**Important:** The app will work fine without a service worker! You just won't get:
- Offline functionality
- Install to home screen prompt
- Background sync

**All calculations and bet logging still work normally!**

## Recommended Approach

1. **Test locally first** - Use `http://localhost:8000`
2. **Deploy to hosting** - Use Netlify, GitHub Pages, or Vercel
3. **Add icons** - Create icon-192.png and icon-512.png
4. **Enable HTTPS** - Automatically provided by hosting platforms
5. **Service worker will work** - No additional configuration needed!

## Still Having Issues?

### Temporary workaround:
Just disable the service worker (see "Quick Fix" above). The app will work perfectly for:
- ✅ All calculations
- ✅ Bet logging
- ✅ Performance tracking
- ✅ All three bet types

You only lose:
- ❌ Offline functionality
- ❌ Install to home screen

Most users won't notice the difference!

## Final Check

Run through this checklist:
- [ ] Using HTTPS or localhost?
- [ ] sw.js in same folder as index.html?
- [ ] Cleared browser cache?
- [ ] Using modern browser?
- [ ] Checked DevTools console for errors?

If all yes and still failing → just disable it and use the app normally!

---

**Bottom line:** Service Worker is optional. The app works great without it. The calculations, suggestions, and bet logging all function perfectly either way!
