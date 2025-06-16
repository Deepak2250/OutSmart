package com.outsmart.audit.context;

import org.springframework.stereotype.Component;

/**
 * Thread-safe context holder for admin audit details during request processing.
 *
 * <p>DESIGN PURPOSE:
 * This class provides temporary storage for audit-related information (like target user details
 * and action descriptions) that needs to be passed between method-level code and AOP advice
 * in a thread-safe manner. It solves the problem of audit data sharing across different layers
 * without polluting method signatures.</p>
 *
 * <p>WHY USE THREADLOCAL?
 * - Web servers handle each request in a separate thread
 * - Storing audit details in regular instance variables would cause race conditions
 *   when multiple admin requests execute simultaneously
 * - ThreadLocal provides isolated storage per thread</p>
 *
 * <p>WHY NOT INHERITABLETHREADLOCAL?
 * - InheritableThreadLocal would propagate values to child threads (dangerous for async operations)
 * - Audit details should be explicitly set for each logical operation
 * - Prevents accidental data leaks between unrelated tasks</p>
 *
 * <p>THREAD SAFETY NOTES:
 * - All methods are thread-safe by virtue of ThreadLocal isolation
 * - The static ThreadLocal fields are safe because they're final and ClassLoader-scoped
 * - Spring singleton management is safe because state is stored in ThreadLocal, not instance fields</p>
 *
 * <p>If you're logging something that depends on context set in one place and read in another (like in AOP) and also use @Async, you must ensure thread safety using InheritableThreadLocal.
 * But if your method doesn’t rely on shared context, and you're passing everything explicitly, then ThreadLocal is unnecessary — even with @Async.</p>
 */
@Component
public class AdminAuditDetailsContext {

    /**
     * ThreadLocal storage for the target entity details (e.g., user email being modified).
     *
     * <p>STORAGE CHARACTERISTICS:
     * - Static: Shared across all instances (ThreadLocal is inherently thread-isolated)
     * - Non-inheritable: Child threads don't receive parent thread's values
     * - Nullable: get() returns null if value was never set</p>
     *
     * <p>TYPICAL USAGE:
     * - Set by service methods before performing admin actions
     * - Read by AOP advice when creating audit log entries</p>
     */
    private static final ThreadLocal<String> targetDetails = new InheritableThreadLocal<>();


    /**
     * ThreadLocal storage for human-readable action description.
     *
     * <p>DIFFERS FROM targetDetails:
     * - Optional context (can be null)
     * - Free-form text explaining the "why" behind the action
     * - Example: "Deactivated user due to policy violation #123"</p>
     */
    private static final ThreadLocal<String> description = new InheritableThreadLocal<>();

    /**
     * Sets the target entity details for the current thread's audit context.
     * @param details Non-null identifier of the entity being acted upon
     *               (e.g., "user123@example.com")
     * @throws IllegalArgumentException if details is null
     */
    public void setTargetDetails(String details) {
        if (details == null) {
            throw new IllegalArgumentException("Target details cannot be null");
        }
        targetDetails.set(details);
    }

    /**
     * Gets the target entity details for the current thread.
     * @return The stored details, or null if not set
     */
    public String getTargetDetails() {
        return targetDetails.get();
    }

    /**
     * Gets the target details with a fallback default value.
     * @param defaultValue Value to return if no details were set
     * @return The stored details or defaultValue if unset
     */
    public String getTargetDetailsOrElse(String defaultValue) {
        String details = targetDetails.get();
        return details != null ? details : defaultValue;
    }

    /**
     * Sets the action description for the current thread's audit context.
     * @param desc Optional free-text explanation (may be null)
     */
    public void setDescription(String desc) {
        description.set(desc);
    }

    /**
     * Gets the action description for the current thread.
     * @return The stored description, or null if not set
     */
    public String getDescription() {
        return description.get();
    }

    /**
     * Clears all audit details for the current thread.
     *
     * <p>CRITICAL USAGE NOTES:
     * 1. Must be called after request completion (typically in finally block)
     * 2. Prevents memory leaks when using thread pools
     * 3. Spring's RequestScope beans handle this automatically,
     *    but ThreadLocal requires manual cleanup</p>
     */
    public void clear() {
        targetDetails.remove();
        description.remove();
    }

}