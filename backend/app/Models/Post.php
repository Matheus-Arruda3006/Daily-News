<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'summary',
        'content',
        'cover_image',
        'read_time',
        'is_premium',
        'views_count',
        'likes_count',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'is_premium' => 'boolean',
            'read_time' => 'integer',
            'views_count' => 'integer',
            'likes_count' => 'integer',
            'published_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    /**
     * Retorna a prévia do conteúdo para não assinantes
     */
    public function getPreviewContentAttribute(): string
    {
        $paragraphs = explode("\n\n", $this->content);
        return implode("\n\n", array_slice($paragraphs, 0, 2));
    }
}
