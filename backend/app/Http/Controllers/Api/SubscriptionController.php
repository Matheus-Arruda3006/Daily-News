<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function plans()
    {
        $plans = [
            [
                'id' => 'price_monthly',
                'name' => 'Plano Mensal',
                'description' => 'Acesso total a todas as publicações e releases exclusivas.',
                'amount' => 9.90,
                'currency' => 'USD',
                'interval' => 'mês',
                'popular' => true,
                'features' => [
                    'Acesso ilimitado a todos os artigos',
                    'Acesso antecipado a novidades do ecossistema React',
                    'Comentários e comunidade exclusiva',
                    'Cancelamento a qualquer momento',
                ],
            ],
            [
                'id' => 'price_annual',
                'name' => 'Plano Anual',
                'description' => 'Economize 20% com o plano anual completo.',
                'amount' => 95.00,
                'currency' => 'USD',
                'interval' => 'ano',
                'popular' => false,
                'features' => [
                    'Tudo do plano mensal',
                    '2 meses grátis',
                    'Badge especial no perfil',
                    'Newsletter semanal VIP com curadoria',
                ],
            ],
        ];

        return response()->json($plans);
    }

    public function subscribe(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'plan_id' => 'required|string',
        ]);

        $isAnnual = $validated['plan_id'] === 'price_annual';
        $amount = $isAnnual ? 95.00 : 9.90;
        $interval = $isAnnual ? 'year' : 'month';
        $planName = $isAnnual ? 'Plano Anual' : 'Plano Mensal';
        $expiresAt = $isAnnual ? now()->addYear() : now()->addMonth();

        // Desativar assinaturas antigas
        Subscription::where('user_id', $user->id)->update(['status' => 'canceled']);

        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_name' => $planName,
            'price_id' => $validated['plan_id'],
            'amount' => $amount,
            'currency' => 'USD',
            'interval' => $interval,
            'status' => 'active',
            'expires_at' => $expiresAt,
            'stripe_subscription_id' => 'sub_sim_' . uniqid(),
        ]);

        $user->update([
            'is_subscribed' => true,
            'subscription_tier' => $interval,
        ]);

        return response()->json([
            'subscription' => $subscription,
            'user' => $user->fresh(['activeSubscription']),
            'message' => 'Parabéns! Sua assinatura está ativa agora.',
        ]);
    }

    public function cancel(Request $request)
    {
        $user = $request->user();

        Subscription::where('user_id', $user->id)
            ->where('status', 'active')
            ->update(['status' => 'canceled']);

        $user->update([
            'is_subscribed' => false,
            'subscription_tier' => null,
        ]);

        return response()->json([
            'user' => $user->fresh(['activeSubscription']),
            'message' => 'Assinatura cancelada com sucesso.',
        ]);
    }

    public function mySubscription(Request $request)
    {
        $user = $request->user();
        $subscription = $user->activeSubscription;

        return response()->json([
            'is_subscribed' => (bool) $user->is_subscribed,
            'subscription' => $subscription,
        ]);
    }
}
