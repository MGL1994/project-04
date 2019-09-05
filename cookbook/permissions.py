from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, _view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user
