/**
 * Media Grid Component
 * Displays a grid of media items with filtering and actions
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ExternalLink, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Media, MediaStatus, MediaType } from '@/types/media.types';

interface MediaGridProps {
  media: Media[];
  isAdmin?: boolean;
  onApprove?: (mediaId: string) => void;
  onReject?: (mediaId: string) => void;
  onPlay?: (media: Media) => void;
}

interface FilterState {
  status?: MediaStatus;
  type?: MediaType;
}

const STATUS_ICONS: Record<MediaStatus, React.ElementType> = {
  PENDING: Clock,
  APPROVED: CheckCircle,
  REJECTED: XCircle,
};

const STATUS_COLORS: Record<MediaStatus, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10',
  APPROVED: 'text-green-400 bg-green-400/10',
  REJECTED: 'text-red-400 bg-red-400/10',
};

export function MediaGrid({
  media,
  isAdmin = false,
  onApprove,
  onReject,
  onPlay,
}: MediaGridProps) {
  const { t } = useTranslation('components');
  const [filters, setFilters] = useState<FilterState>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredMedia = media.filter((item) => {
    if (filters.status && item.status !== filters.status) return false;
    if (filters.type && item.type !== filters.type) return false;
    return true;
  });

  const handleFilterChange = (key: keyof FilterState, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <Button
          variant="tft-ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {t('media.filters')}
        </Button>

        {(filters.status || filters.type) && (
          <Button variant="tft-ghost" size="sm" onClick={clearFilters}>
            {t('media.clearFilters')}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-4 p-4 glass-card rounded-lg"
          >
            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-xs text-[var(--tft-text-secondary)]">
                {t('media.status')}
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) =>
                  handleFilterChange('status', e.target.value as MediaStatus | undefined)
                }
                className="px-3 py-2 rounded-lg bg-[var(--tft-bg-dark)] border border-[var(--glass-border)] text-[var(--tft-text-primary)] text-sm"
              >
                <option value="">{t('media.allStatuses')}</option>
                <option value="PENDING">{t('media.statusPending')}</option>
                <option value="APPROVED">{t('media.statusApproved')}</option>
                <option value="REJECTED">{t('media.statusRejected')}</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-1">
              <label className="text-xs text-[var(--tft-text-secondary)]">
                {t('media.type')}
              </label>
              <select
                value={filters.type || ''}
                onChange={(e) =>
                  handleFilterChange('type', e.target.value as MediaType | undefined)
                }
                className="px-3 py-2 rounded-lg bg-[var(--tft-bg-dark)] border border-[var(--glass-border)] text-[var(--tft-text-primary)] text-sm"
              >
                <option value="">{t('media.allTypes')}</option>
                <option value="TWITCH_VOD">{t('media.typeTwitchVod')}</option>
                <option value="TWITCH_CLIP">{t('media.typeTwitchClip')}</option>
                <option value="UPLOAD">{t('media.typeUpload')}</option>
                <option value="YOUTUBE">{t('media.typeYoutube')}</option>
                <option value="SCREENSHOT">{t('media.typeScreenshot')}</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-[var(--tft-text-secondary)] glass-card rounded-xl">
          {t('media.noMedia')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedia.map((item, index) => {
            const StatusIcon = STATUS_ICONS[item.status];
            const statusColor = STATUS_COLORS[item.status];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[var(--tft-bg-dark)]">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-[var(--tft-text-muted)]" />
                    </div>
                  )}

                  {/* Play Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                    onClick={() => onPlay?.(item)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-[#C8AA6E] flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-[var(--tft-bg-dark)] ml-1" />
                    </motion.div>
                  </motion.div>

                  {/* Status Badge */}
                  <div
                    className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColor}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {t(`media.status${item.status.charAt(0) + item.status.slice(1).toLowerCase()}`)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-[var(--tft-text-primary)] line-clamp-1">
                      {item.title}
                    </h3>
                    {item.caster && (
                      <p className="text-sm text-[var(--tft-text-secondary)]">
                        {item.caster.displayName}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm text-[var(--tft-text-muted)] line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-[var(--tft-text-muted)]">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="uppercase">{item.type.replace('_', ' ')}</span>
                  </div>

                  {/* Admin Actions */}
                  {isAdmin && item.status === 'PENDING' && (
                    <div className="flex gap-2 pt-2 border-t border-[var(--glass-border)]">
                      <Button
                        variant="tft-ghost"
                        size="sm"
                        className="flex-1 text-green-400 hover:bg-green-400/10"
                        onClick={() => onApprove?.(item.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {t('media.approve')}
                      </Button>
                      <Button
                        variant="tft-ghost"
                        size="sm"
                        className="flex-1 text-red-400 hover:bg-red-400/10"
                        onClick={() => onReject?.(item.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        {t('media.reject')}
                      </Button>
                    </div>
                  )}

                  {/* External Link */}
                  {item.embedUrl && (
                    <a
                      href={item.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-[#C8AA6E] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {t('media.viewOriginal')}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
