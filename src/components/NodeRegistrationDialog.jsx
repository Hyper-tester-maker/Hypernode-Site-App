import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';

const GPU_MODELS = [
  'NVIDIA RTX 4090',
  'NVIDIA RTX 4080 Super',
  'NVIDIA RTX 4080',
  'NVIDIA RTX 4070 Ti Super',
  'NVIDIA RTX 4070 Ti',
  'NVIDIA RTX 4070',
  'NVIDIA RTX 3090 Ti',
  'NVIDIA RTX 3090',
  'NVIDIA RTX 3080 Ti',
  'NVIDIA RTX 3080',
  'NVIDIA RTX 3070 Ti',
  'NVIDIA RTX 3070',
  'AMD Radeon RX 7900 XTX',
  'AMD Radeon RX 7900 XT',
  'AMD Radeon RX 7800 XT',
  'AMD Radeon RX 6900 XT',
  'AMD Radeon RX 6800 XT',
  'Other / Custom',
];

const VRAM_OPTIONS = [4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64, 80];

const CAPABILITIES = [
  { id: 'inference', label: 'LLM Inference' },
  { id: 'training', label: 'Model Training' },
  { id: 'fine_tuning', label: 'Fine-tuning' },
  { id: 'render', label: 'Rendering' },
  { id: 'vision', label: 'Computer Vision' },
];

const NodeRegistrationDialog = ({ open, onOpenChange, onNodeRegistered }) => {
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    gpuModel: 'Select GPU Model',
    vram: 'Select VRAM',
    capabilities: ['inference'],
  });

  const handleRegister = async () => {
    if (!publicKey) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.gpuModel === 'Select GPU Model') {
      toast({
        title: 'GPU Model Required',
        description: 'Please select your GPU model.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.vram === 'Select VRAM') {
      toast({
        title: 'VRAM Required',
        description: 'Please select your GPU VRAM.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsRegistering(true);

      const nodeData = {
        walletAddress: publicKey.toBase58(),
        gpuModel: formData.gpuModel,
        vram: parseInt(formData.vram),
        driverVersion: 'Auto-detected',
        cudaVersion: 'Auto-detected',
        hostOS: 'Auto-detected',
        cpuModel: 'Auto-detected',
        ramTotal: 0,
        location: {
          country: 'Unknown',
          city: 'Unknown',
          lat: 0,
          lon: 0,
        },
        capabilities: formData.capabilities,
      };

      const response = await api.registerNode(nodeData);

      toast({
        title: 'Node Registered Successfully! 🎉',
        description: `Your ${formData.gpuModel} has been registered to the network.`,
      });

      // Reset form
      setFormData({
        gpuModel: 'Select GPU Model',
        vram: 'Select VRAM',
        capabilities: ['inference'],
      });

      if (onNodeRegistered) {
        onNodeRegistered(response.node);
      }

      onOpenChange(false);
    } catch (error) {
      console.error('Error registering node:', error);
      toast({
        title: 'Registration Failed',
        description: error.message || 'Failed to register node. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const toggleCapability = (capId) => {
    setFormData((prev) => {
      const capabilities = prev.capabilities.includes(capId)
        ? prev.capabilities.filter((c) => c !== capId)
        : [...prev.capabilities, capId];

      // Ensure at least one capability is selected
      if (capabilities.length === 0) {
        return prev;
      }

      return { ...prev, capabilities };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">
            Register GPU Node
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect your GPU to the Hypernode network and start earning HYPER tokens.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* GPU Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="gpu-model" className="text-gray-300">
              GPU Model *
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-black/30 border-cyan-500/50 text-white hover:bg-cyan-500/10"
                >
                  {formData.gpuModel}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[450px] max-h-[300px] overflow-y-auto bg-gray-800 border-cyan-500/50 text-white">
                {GPU_MODELS.map((model) => (
                  <DropdownMenuItem
                    key={model}
                    onSelect={() => setFormData({ ...formData, gpuModel: model })}
                    className="hover:bg-cyan-500/10"
                  >
                    {model}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* VRAM Selection */}
          <div className="space-y-2">
            <Label htmlFor="vram" className="text-gray-300">
              VRAM (GB) *
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-black/30 border-cyan-500/50 text-white hover:bg-cyan-500/10"
                >
                  {formData.vram}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[450px] bg-gray-800 border-cyan-500/50 text-white">
                {VRAM_OPTIONS.map((vram) => (
                  <DropdownMenuItem
                    key={vram}
                    onSelect={() => setFormData({ ...formData, vram: vram.toString() })}
                    className="hover:bg-cyan-500/10"
                  >
                    {vram} GB
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Capabilities */}
          <div className="space-y-2">
            <Label className="text-gray-300">Capabilities *</Label>
            <div className="grid grid-cols-2 gap-2">
              {CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => toggleCapability(cap.id)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    formData.capabilities.includes(cap.id)
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-black/30 border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-sm text-gray-400">
            <p className="text-xs">
              📝 Note: Additional system information (driver version, OS, CPU) will be
              auto-detected when you run the node client.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800"
            disabled={isRegistering}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            disabled={isRegistering}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
          >
            {isRegistering ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              'Register Node'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeRegistrationDialog;
