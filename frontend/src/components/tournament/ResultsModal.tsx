/**
 * Results Modal Component
 * Modal for submitting match results with placements and notes
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Trophy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Participant {
  id: string;
  displayName: string;
}

interface PlacementResult {
  participantId: string;
  placement: number;
  points: number;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  participants: Participant[];
  onSubmit: (placements: PlacementResult[], notes: string, evidenceUrl: string) => Promise<void>;
}

const POINTS_BY_PLACEMENT: Record<number, number> = {
  1: 8,
  2: 7,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1,
};

export function ResultsModal({
  isOpen,
  onClose,
  participants,
  onSubmit,
}: ResultsModalProps) {
  const { t } = useTranslation('components');
  const [placements, setPlacements] = useState<Map<string, number>>(new Map());
  const [notes, setNotes] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlacementChange = (participantId: string, placement: number) => {
    const newPlacements = new Map(placements);
    
    // Remove any existing participant with this placement
    for (const [id, p] of newPlacements) {
      if (p === placement && id !== participantId) {
        newPlacements.delete(id);
      }
    }
    
    newPlacements.set(participantId, placement);
    setPlacements(newPlacements);
  };

  const handleSubmit = async () => {
    setError(null);
    
    // Validate all participants have placements
    if (placements.size !== participants.length) {
      setError(t('results.error.missingPlacements'));
      return;
    }

    // Check for duplicate placements
    const placementValues = Array.from(placements.values());
    const uniquePlacements = new Set(placementValues);
    if (uniquePlacements.size !== placementValues.length) {
      setError(t('results.error.duplicatePlacements'));
      return;
    }

    setIsSubmitting(true);
    try {
      const results: PlacementResult[] = Array.from(placements.entries()).map(
        ([participantId, placement]) => ({
          participantId,
          placement,
          points: POINTS_BY_PLACEMENT[placement] || 0,
        })
      );

      await onSubmit(results, notes, evidenceUrl);
      onClose();
    } catch (err) {
      setError(t('results.error.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlacementForParticipant = (participantId: string): number | undefined => {
    return placements.get(participantId);
  };

  const getPointsForPlacement = (placement: number | undefined): number => {
    if (!placement) return 0;
    return POINTS_BY_PLACEMENT[placement] || 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-[var(--glass-border)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--tft-text-primary)]">
            <Trophy className="w-5 h-5 text-[#C8AA6E]" />
            {t('results.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Participants and Placements */}
          <div className="space-y-4">
            <Label className="text-[var(--tft-text-secondary)]">
              {t('results.selectPlacements')}
            </Label>
            <div className="grid gap-3">
              {participants.map((participant) => {
                const placement = getPlacementForParticipant(participant.id);
                const points = getPointsForPlacement(placement);

                return (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[var(--tft-bg-card)] border border-[var(--glass-border)]"
                  >
                    <div className="flex-1">
                      <p className="text-[var(--tft-text-primary)] font-medium">
                        {participant.displayName}
                      </p>
                    </div>

                    {/* Placement selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={placement || ''}
                        onChange={(e) =>
                          handlePlacementChange(participant.id, parseInt(e.target.value))
                        }
                        className="w-20 px-3 py-2 rounded-lg bg-[var(--tft-bg-dark)] border border-[var(--glass-border)] text-[var(--tft-text-primary)] focus:outline-none focus:border-[#C8AA6E]"
                      >
                        <option value="">-</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>

                      {/* Points display */}
                      <div className="w-16 text-center">
                        {placement && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`inline-flex items-center justify-center px-2 py-1 rounded text-sm font-medium ${
                              placement === 1
                                ? 'bg-[rgba(255,215,0,0.2)] text-[#FFD700]'
                                : placement <= 4
                                ? 'bg-[rgba(200,170,110,0.2)] text-[#C8AA6E]'
                                : 'bg-[rgba(100,100,100,0.2)] text-[var(--tft-text-secondary)]'
                            }`}
                          >
                            +{points}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[var(--tft-text-secondary)]">
              {t('results.notes')}
            </Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('results.notesPlaceholder')}
              className="w-full h-24 px-3 py-2 rounded-lg bg-[var(--tft-bg-dark)] border border-[var(--glass-border)] text-[var(--tft-text-primary)] placeholder:text-[var(--tft-text-muted)] focus:outline-none focus:border-[#C8AA6E] resize-none"
            />
          </div>

          {/* Evidence URL */}
          <div className="space-y-2">
            <Label htmlFor="evidence" className="text-[var(--tft-text-secondary)]">
              {t('results.evidence')}
            </Label>
            <div className="flex gap-2">
              <Input
                id="evidence"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder={t('results.evidencePlaceholder')}
                className="flex-1 bg-[var(--tft-bg-dark)] border-[var(--glass-border)] text-[var(--tft-text-primary)]"
              />
              <Button variant="tft-ghost" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Points Summary */}
          <div className="p-4 rounded-lg bg-[var(--tft-bg-dark)] border border-[var(--glass-border)]">
            <h4 className="text-sm font-medium text-[var(--tft-text-secondary)] mb-2">
              {t('results.pointsSummary')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                <span
                  key={p}
                  className="px-2 py-1 text-xs rounded bg-[rgba(200,170,110,0.1)] text-[var(--tft-text-secondary)]"
                >
                  {p}. = {POINTS_BY_PLACEMENT[p]} pts
                </span>
              ))}
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-lg bg-[rgba(255,100,100,0.1)] border border-[rgba(255,100,100,0.3)] text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--glass-border)]">
          <Button variant="tft-ghost" onClick={onClose} disabled={isSubmitting}>
            {t('results.cancel')}
          </Button>
          <Button
            variant="tft-primary"
            onClick={handleSubmit}
            disabled={isSubmitting || placements.size !== participants.length}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('results.submit')}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
