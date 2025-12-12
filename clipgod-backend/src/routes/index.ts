import { Router } from 'express';
import * as generateCtrl from '../controllers/generate';
import * as postCtrl from '../controllers/post';
import * as analyticsCtrl from '../controllers/analytics';
import * as trendsCtrl from '../controllers/trends';
import * as brandKitCtrl from '../controllers/brandKit';
import * as libraryCtrl from '../controllers/library';
import * as userCtrl from '../controllers/user';
import * as workspaceCtrl from '../controllers/workspace';
import * as streakCtrl from '../controllers/streak';
import * as leaderboardCtrl from '../controllers/leaderboard';
import * as shadowCtrl from '../controllers/shadow';
import * as roastCtrl from '../controllers/roast';
import * as commitmentCtrl from '../controllers/commitment';
import { validate } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

// Generate endpoints
const generateSchema = z.object({ body: z.object({ source_url: z.string().url() }) });
router.post('/generate', validate(generateSchema), generateCtrl.generate);
router.get('/generate/:id', generateCtrl.getStatus);
router.get('/generate/:id/clips', generateCtrl.getClips);
router.get('/generate/:id/winner', generateCtrl.getWinner); // Triggers confetti moat
router.get('/generate/:id/calendar', generateCtrl.getCalendar);

// Post endpoints
const postSchema = z.object({ body: z.object({ clip_id: z.string().uuid(), platform: z.enum(['tiktok', 'ig', 'youtube']) }) });
router.post('/post', validate(postSchema), postCtrl.postClip); // One-click + dopamine moat
const scheduleSchema = z.object({ body: z.object({ generation_id: z.string().uuid(), dates: z.array(z.string().datetime()) }) });
router.post('/post/schedule', validate(scheduleSchema), postCtrl.schedulePosts);

// Analytics endpoints
const uploadAnalyticsSchema = z.object({ body: z.object({ clip_id: z.string().uuid(), views: z.number(), likes: z.number() }) });
router.post('/analytics/upload', validate(uploadAnalyticsSchema), analyticsCtrl.uploadAnalytics); // Feeds moats
router.get('/analytics/dashboard', analyticsCtrl.getDashboard);
router.get('/analytics/clip/:clipId', analyticsCtrl.getClipAnalytics);

// Trends endpoints
router.get('/trends/global', trendsCtrl.getGlobalTrends);
router.get('/trends/personal', trendsCtrl.getPersonalTrends);

// Brand kit
const brandKitSchema = z.object({ body: z.object({ file: z.any() }) }); // Handle multipart
router.post('/brand-kit', brandKitCtrl.uploadBrandKit); // Assuming multer for upload

// Library
router.get('/library', libraryCtrl.getLibrary);

// User/GDPR
router.delete('/user/delete', userCtrl.deleteUser); // GDPR wipe
const consentSchema = z.object({ body: z.object({ analytics_enabled: z.boolean(), marketing_enabled: z.boolean() }) });
router.post('/consent', validate(consentSchema), userCtrl.updateConsent);

// Workspace
router.get('/workspace/:id', workspaceCtrl.getWorkspace);

// Streaks (Viral Streak Fire moat)
router.get('/streak', streakCtrl.getStreak);
router.post('/streak/checkin', streakCtrl.checkinStreak); // Update on post, shame if broken

// Leaderboard (FOMO moat)
router.get('/leaderboard', leaderboardCtrl.getLeaderboard);

// Shadow (Money Left on Table & Shadow Audience moats)
router.get('/shadow', shadowCtrl.getShadowMetrics);

// Roast (AI Roasts moat)
router.post('/roast', roastCtrl.getRoast); // If inactive >3 days

// Commitment (Public Commitment Device moat)
const commitmentSchema = z.object({ body: z.object({ days_goal: z.number(), start_date: z.string().date() }) });
router.post('/commitment', validate(commitmentSchema), commitmentCtrl.createCommitment);

export default router;
